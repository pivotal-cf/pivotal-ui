# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  #config.vm.network "private_network", type: "dhcp"
  #config.vm.synced_folder ".", "/vagrant", type: "nfs"

  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 4
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nodejs nodejs-legacy npm xvfb git firefox libfontconfig
    sudo npm install npm -g
    if [ ! -d "csscritic" ]; then
        git clone https://github.com/cburgmer/csscritic.git
        sudo chown vagrant:vagrant -R csscritic
    fi
    cd csscritic
    git pull
    echo "You can now run the test suite via $ xvfb-run ./go"
  SHELL
end
