FROM dockerfile/python
MAINTAINER Amaury Brisou

# Install Node.js
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  echo '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bash_profile

# COPY my sources to /root/go
ADD . /root/LeBrisouBackend
# set working dir
WORKDIR /root/LeBrisouBackend

#install dependencies
RUN npm install -g forever

# expose port 8080 EXPOSE 8080
EXPOSE 8081

CMD ["npm", "start"]