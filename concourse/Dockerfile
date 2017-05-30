FROM ubuntu:14.04
USER root
ENV SHELL /bin/bash

RUN apt-get update && apt-get install -y vim \
                       wget \
                       curl \
                       libssl-dev \
                       libreadline-dev \
                       zlib1g-dev \
                       libpng-dev \
                       checkinstall \
                       libncursesw5-dev \
                       libsqlite3-dev \
                       tk-dev \
                       libgdbm-dev \
                       libc6-dev \
                       libbz2-dev \
                       build-essential \
                       git \
                       default-jdk \
                       apt-transport-https \
                       python2.7 \
                       gyp \
                       unzip \
                       && rm -rf /var/lib/apt/lists/*



# Add external apt-get repos
# Add yarn repo
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# Add nodejs repo
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
# Add chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
# Add CF repo
RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
RUN echo "deb http://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list

RUN sudo apt-get update

RUN apt-get -y install dbus --fix-missing
RUN apt-get -y install dbus-x11 --fix-missing

# install YARN
RUN apt-get install -y yarn

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

# node
ENV NODE_PATH /usr/lib/node_modules/
RUN npm install -g gulp


# install chrome
RUN apt-get -y install google-chrome-stable
RUN wget -N http://chromedriver.storage.googleapis.com/2.25/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip \
    && chmod +x chromedriver \
    && mv -f chromedriver /usr/local/bin/chromedriver
RUN apt-get -y install xvfb --fix-missing # chrome will use this to run headlessly

# cf
RUN apt-get install cf-cli

# install dbus - chromedriver needs this to talk to google-chrome
RUN ln -s /bin/dbus-daemon /usr/bin/dbus-daemon     # /etc/init.d/dbus has the wrong location
RUN ln -s /bin/dbus-uuidgen /usr/bin/dbus-uuidgen   # /etc/init.d/dbus has the wrong location

# cache npm packages
RUN npm i phantomjs-prebuilt@2.1.14 --global
