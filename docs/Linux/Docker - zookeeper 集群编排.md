#docker #zookeeper
## docker-compose.yaml
```yaml
services:
  zk1:
    image: zookeeper:${VERSION}
    container_name: ${CONTAINER_NAME}1
    restart: always
    ports:
      - ${HOST_IP}:${ZK1_PORT}:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server.1=zk1:2888:3888 server.2=zk2:2888:3888 server.3=zk3:2888:3888
      ZOO_CFG_EXTRA: "clientPort=2181"
      ZOO_4LW_COMMANDS_WHITELIST: "stat,ruok,conf,status"
    volumes:
      - ${APP_PATH}/zk1/data:/data
      - ${APP_PATH}/zk1/logs:/logs
    networks:
      - baota_net
    labels:
      createdBy: "Tiamat"

  zk2:
    image: zookeeper:${VERSION}
    container_name: ${CONTAINER_NAME}2
    restart: always
    ports:
      - ${HOST_IP}:${ZK2_PORT}:2181
    environment:
      ZOO_MY_ID: 2
      ZOO_SERVERS: server.1=zk1:2888:3888 server.2=zk2:2888:3888 server.3=zk3:2888:3888
      ZOO_CFG_EXTRA: "clientPort=2181"
      ZOO_4LW_COMMANDS_WHITELIST: "stat,ruok,conf,status"
    volumes:
      - ${APP_PATH}/zk2/data:/data
      - ${APP_PATH}/zk2/logs:/logs
    networks:
      - baota_net
    labels:
      createdBy: "Tiamat"

  zk3:
    image: zookeeper:${VERSION}
    container_name: ${CONTAINER_NAME}3
    restart: always
    ports:
      - ${HOST_IP}:${ZK3_PORT}:2181
    environment:
      ZOO_MY_ID: 3
      ZOO_SERVERS: server.1=zk1:2888:3888 server.2=zk2:2888:3888 server.3=zk3:2888:3888
      ZOO_CFG_EXTRA: "clientPort=2181"
      ZOO_4LW_COMMANDS_WHITELIST: "stat,ruok,conf,status"
    volumes:
      - ${APP_PATH}/zk3/data:/data
      - ${APP_PATH}/zk3/logs:/logs
    networks:
      - baota_net
    labels:
      createdBy: "Tiamat"
      
networks:
  baota_net:
    external: true
```

## .env
```env
VERSION=latest
CONTAINER_NAME=zk
HOST_IP=0.0.0.0
ZK1_PORT=33001
ZK2_PORT=33002
ZK3_PORT=33003
APP_PATH=/www/dk_project/dk_app/zookeeper
```
