FROM node:16 as build-stage
WORKDIR /frontend
#ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.5 as production-stage
COPY --from=build-stage /frontend/dist /dist
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/services.conf /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/services.conf /etc/nginx/sites-enabled/


# RUN mkdir -p /etc/nginx/sites-enabled/\
#     && ln -s /etc/nginx/sites-available/my_nginx.conf /etc/nginx/sites-enabled/\
#     && rm /etc/nginx/conf.d/default.conf

CMD [ "/bin/bash", "-c", "nginx -g 'daemon off;'" ]

