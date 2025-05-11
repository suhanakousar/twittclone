# Use Maven and Java combined image
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Use a smaller base image for running
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the jar
CMD ["java", "-jar", "app.jar"]
