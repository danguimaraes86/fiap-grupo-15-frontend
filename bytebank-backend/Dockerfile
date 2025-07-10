
# Estágio 1: Build da aplicação
FROM eclipse-temurin:21-jdk AS builder

# Diretório de trabalho para o build
WORKDIR /app

# Copiar arquivos de configuração do Gradle
COPY build.gradle settings.gradle gradlew ./
COPY gradle/ gradle/

# Copiar código fonte
COPY src/ src/

# Dar permissão de execução ao gradlew e fazer o build
RUN chmod +x gradlew && ./gradlew build -x test

# Use uma imagem base do Java 21
FROM eclipse-temurin:21-jre

# Diretório de trabalho
WORKDIR /app

# Copie o JAR gerado pelo build do Gradle
COPY --from=builder /app/build/libs/bytebank-backend-0.0.1-SNAPSHOT.jar app.jar

# Exponha a porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização (Heroku define $PORT)
ENTRYPOINT ["java", "-jar", "app.jar"]



