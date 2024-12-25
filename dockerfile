FROM ubuntu:latest

# Set bash as main shell
SHELL ["/bin/bash", "-c"]

# Update apt-get and install deps
RUN apt-get update -q && \
    apt-get install -q -y --no-install-recommends unzip curl wget git \
    bzip2 ca-certificates libglib2.0-0 libsm6 libxext6 libxrender1 mercurial openssh-client procps subversion apt-transport-https build-essential libssl-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install miniconda3, derived from continuumio/miniconda3
WORKDIR /miniconda3
ENV PATH=/opt/conda/bin:$PATH
ARG INSTALLER_URL="https://repo.anaconda.com/miniconda/Miniconda3-py312_24.11.1-0-Linux-x86_64.sh"
ARG SHA256SUM="636b209b00b6673471f846581829d4b96b9c3378679925a59a584257c3fef5a3"

RUN set -x && \
    wget "${INSTALLER_URL}" -O miniconda.sh -q && \
    echo "${SHA256SUM} miniconda.sh" > shasum && \
    sha256sum --check --status shasum && \
    mkdir -p /opt && \
    bash miniconda.sh -b -p /opt/conda && \
    rm miniconda.sh shasum && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc && \
    find /opt/conda/ -follow -type f -name '*.a' -delete && \
    find /opt/conda/ -follow -type f -name '*.js.map' -delete && \
    /opt/conda/bin/conda clean -afy

# Install bun, derived from https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker
WORKDIR /
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=20.13.1

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN mkdir -p $NVM_DIR

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.1/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    nvm install v$NODE_VERSION && \
    nvm use --delete-prefix v$NODE_VERSION

ENV NODE_PATH=$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g bun tsx

# Copy app
WORKDIR /app
COPY . .
RUN bun install && \
    conda install python=3.9 pip && \
    pip install -r python/requirements.txt

# Expose python server port
EXPOSE 15411

# Run app
CMD [ "bun", "run", "dev" ]