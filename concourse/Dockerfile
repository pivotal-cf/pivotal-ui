FROM ubuntu:14.04
USER root
ENV SHELL /bin/bash

RUN apt-get update
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
ENV PATH ${PATH}:${rbenvbin}
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

# chrome
RUN apt-get install -y libxss1
RUN apt-get install -y libappindicator1
RUN apt-get install -y libindicator7
RUN apt-get install -y libpangox-1.0-0
RUN apt-get install -y libpangoxft-1.0-0
RUN apt-get install -y libpango1.0-0
RUN apt-get install -y fonts-liberation
RUN apt-get install -y xdg-utils
RUN apt-get install -y wget
RUN curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > /tmp/google-chrome-stable_current_amd64.deb
RUN dpkg -i /tmp/google-chrome-stable_current_amd64.deb

# cf
RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
RUN echo "deb http://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list
RUN apt-get update
RUN apt-get install cf-cli