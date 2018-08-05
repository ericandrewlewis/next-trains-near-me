FROM arm64v8/node

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["node", "server.js"]