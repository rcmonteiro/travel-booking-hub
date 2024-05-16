## Why monorepo?

Since this is a project to create microservices with domain event communication, and I am the only developer working on the back-end and front-end, it doesn't make sense to work with multiple repositories. Using Turborepo will significantly improve my productivity in this project!


##  What's my goal with this project?

To learn more about properly implementing microservices in a real-case scenario.

##  Project overview

TravelBookingHub is designed to simplify travel planning by unifying various services into a seamless platform. Here’s a breakdown of the system components and their interactions:

- API Gateway:
  - Acts as the central entry point for all client requests.
  - Handles user authentication and authorization using JWT.
  - Routes requests to the appropriate microservices.
- User Service:
  - Manages user registration, authentication, and profile data.
  - Implements JWT for secure access control.
- Flight Service:
  - Manages flight search, booking, and reservation confirmations.
  - Publishes flight reservation events to the event bus.
- Hotel Service:
  - Handles hotel search, availability checks, and bookings.
  - Publishes hotel reservation events to the event bus.
- Car Rental Service:
  - Manages car rental search, bookings, and confirmations.
  - Publishes car rental reservation events to the event bus.
- Event Bus:
  - Utilizes RabbitMQ for inter-service communication.
  - Ensures real-time updates and data consistency across services.

##  Tech Stack

- TypeScript, always o/
- Next.js for the user interface
- Node.js proxy for the API Gateway solution
- Node.js with Fastify and Zod for the back-end microservices
- Postgres to persist data on each microservice
- RabbitMQ for the event bus solution