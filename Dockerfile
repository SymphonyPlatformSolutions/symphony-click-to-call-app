FROM openjdk:8-jdk-alpine
WORKDIR /data/symphony
COPY ./target/*.jar bot.jar
COPY internal_truststore internal_truststore
ENTRYPOINT [ "java", "-jar", "./bot.jar" ]
