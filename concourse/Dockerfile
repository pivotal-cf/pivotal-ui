FROM ubuntu:14.04
USER root
ENV SHELL /bin/bash

RUN apt-get update
RUN apt-get install -y wget
RUN apt-get install -y curl
RUN apt-get install -y libssl-dev
RUN apt-get install -y libreadline-dev
RUN apt-get install -y libreadline-gplv2-dev
RUN apt-get install -y zlib1g-dev
RUN apt-get install -y libpng-dev
RUN apt-get install -y checkinstall
RUN apt-get install -y libncursesw5-dev
RUN apt-get install -y libsqlite3-dev
RUN apt-get install -y tk-dev
RUN apt-get install -y libgdbm-dev
RUN apt-get install -y libc6-dev
RUN apt-get install -y libbz2-dev
RUN apt-get install -y build-essential
RUN apt-get install -y git

# ruby
RUN git clone https://github.com/rbenv/rbenv.git /root/.rbenv
RUN cd ~/.rbenv && src/configure
RUN cd ~/.rbenv && make -C src
RUN git clone https://github.com/rbenv/ruby-build.git /root/.rbenv/plugins/ruby-build
ENV rbenvbin /root/.rbenv/bin
ENV PATH ${PATH}:${rbenvbin}:/root/.rbenv/shims
RUN ${rbenvbin}/rbenv install 2.3.0
RUN rbenv global 2.3.0
RUN echo 'eval "$(rbenv init -)"' >> /root/.bashrc
RUN eval "$(rbenv init -)" && gem install bundler
RUN eval "$(rbenv init -)" && gem install rspec
RUN rbenv rehash

# python
RUN apt-get install -y python2.7
RUN ln -s /usr/bin/python2.7 /usr/bin/python

# node
RUN apt-get install -y gyp
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
ENV NODE_PATH /usr/lib/node_modules/
RUN npm install -g gulp

# java
RUN apt-get install -y default-jdk

# install chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get -y install google-chrome-stable
RUN wget -N http://chromedriver.storage.googleapis.com/2.25/chromedriver_linux64.zip
RUN apt-get install -y unzip
RUN unzip chromedriver_linux64.zip
RUN chmod +x chromedriver
RUN mv -f chromedriver /usr/local/bin/chromedriver
RUN apt-get -y install xvfb --fix-missing # chrome will use this to run headlessly

# cf
RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
RUN echo "deb http://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list
RUN apt-get update
RUN apt-get install cf-cli

# install dbus - chromedriver needs this to talk to google-chrome
RUN apt-get -y install dbus --fix-missing
RUN apt-get -y install dbus-x11 --fix-missing
RUN ln -s /bin/dbus-daemon /usr/bin/dbus-daemon     # /etc/init.d/dbus has the wrong location
RUN ln -s /bin/dbus-uuidgen /usr/bin/dbus-uuidgen   # /etc/init.d/dbus has the wrong location