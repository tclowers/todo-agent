import { NextResponse } from "next/server"
import { getTasksFromDb, updateTaskInDb } from "@/lib/services/db/tasks"
import { createCommentInDb } from "@/lib/services/db/comments"
import { analyzeTaskCompletion } from "@/lib/services/openai"
import { BASE_ACTIONS } from "@/lib/services/base-actions"
import { COMPLETION_AGENT_USER_ID, HUMAN_EMPLOYEE_USER_ID } from "@/lib/constants"

export async function POST() {
  try {
    // Get pending tasks assigned to completion agent
    const tasks = await getTasksFromDb()
    const pendingTasks = tasks.filter(
      task => task.status === "pending" && task.assigned_to === COMPLETION_AGENT_USER_ID
    )

    for (const task of pendingTasks) {
      try {
        // Analyze task with OpenAI
        const analysis = await analyzeTaskCompletion(task)

        if (analysis.can_complete && analysis.action && analysis.parameters) {
          // Execute base action
          const action = BASE_ACTIONS[analysis.action as keyof typeof BASE_ACTIONS]
          const result = await action(analysis.parameters)

          // Add success comment
          await createCommentInDb({
            task_id: task.id,
            user_id: COMPLETION_AGENT_USER_ID,
            content: `Completed task using ${analysis.action}. ${result.message}`
          })

          // Mark task as completed
          await updateTaskInDb(task.id, {
            ...task,
            status: "completed"
          })
        } else {
          // Reassign to human and add comment
          await createCommentInDb({
            task_id: task.id,
            user_id: COMPLETION_AGENT_USER_ID,
            content: `Unable to complete task: ${analysis.reason}. Reassigning to human.`
          })

          await updateTaskInDb(task.id, {
            ...task,
            assigned_to: HUMAN_EMPLOYEE_USER_ID
          })
        }
      } catch (error) {
        console.error(`Error processing task ${task.id}:`, error)
        continue
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error completing tasks:", error)
    return NextResponse.json(
      { error: "Failed to complete tasks" },
      { status: 500 }
    )
  }
} 