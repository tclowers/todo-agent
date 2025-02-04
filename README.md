# AI Receptionist Task Management System

An intelligent task management system powered by GPT-4, designed to act as an automated receptionist for scheduling appointments and managing customer interactions for a home services company.

## Overview

This project implements an AI-powered receptionist that can:
- Chat with customers to schedule appointments
- Collect customer information
- Generate and manage tasks automatically
- Handle appointment scheduling and confirmations
- Process tasks using agentic actions

## Key Features

- Real-time chat interface with AI receptionist
- Automated task extraction from conversations
- Task completion system with human fallback
- Customer management
- Appointment scheduling
- Multi-user support with different roles (AI agents, human employees)

## Technical Stack

- Next.js 15
- TypeScript
- OpenAI GPT-4
- Supabase for database and auth
- Tailwind CSS with shadcn/ui components
- Vercel for deployment

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Automated Tasks

This project has two POST endpoints that should be run once an hour, 5 minutes apart, to perform agentic actions. Add the following to your vercel.json:

```json
{
  "crons": {
    "evaluate_chats": {
      "path": "/api/chats/evaluate",
      "schedule": "0 * * * *"
    },
    "complete_tasks": {
      "path": "/api/tasks/complete",
      "schedule": "5 * * * *"
    }
  }
}
```

## System Architecture

The system operates in three main phases:

1. **Chat Phase**: 
   - AI receptionist interacts with customers
   - Collects necessary information
   - Uses context-aware responses

2. **Evaluation Phase**: 
   - Analyzes completed conversations
   - Extracts actionable tasks
   - Determines conversation completeness

3. **Task Completion Phase**:
   - Attempts to complete tasks automatically
   - Falls back to human operators when needed
   - Manages customer records and appointments

## AI Components

The system uses several specialized AI prompts:
- Receptionist prompt for customer interaction
- Task extraction for identifying required actions
- Task completion analysis for automated processing
- Chat evaluation for determining conversation completeness

## License

MIT License

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.