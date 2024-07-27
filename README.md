# ID-Craft  ->Event ID Card Creator


# Proposed Architecture
```mermaid
        graph TD
        A[Client - React SPA] -->|API Requests| B[API Gateway]
        B --> C[Authentication Service]
        B --> D[User Service]
        B --> E[Event Service]
        B --> F[ID Card Service]
        C & D & E & F -->|Read/Write| G[(Database)]
        F -->|Generate| H[QR Code Service]
        F -->|Process| I[Image Processing Service]
        J[Admin Dashboard] -->|Manage| B
```

## Project Overview
Event ID Card Creator is a web application designed to simplify the process of creating and managing ID cards for events and organizations. This tool allows event organizers to quickly generate professional ID cards for attendees, enhancing event security and facilitating networking.

## Key Features
- Instant ID card generation
- QR code integration for easy contact sharing
- Customizable templates for different event types
- Secure user authentication and data management
- Scalable from small gatherings to large conferences

## Technology Stack
- Frontend: React, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: PostgreSQL, MongoDB
- Containerization: Docker
- CI/CD: GitHub Actions
