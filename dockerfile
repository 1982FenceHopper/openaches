FROM ubuntu:latest

# Update apt-get and install deps
RUN apt-get update
RUN apt-get install unzip curl wget git -y

# Install bun
RUN curl -fsSL https://bun.sh/install | bash
RUN source /root/.bashrc

# Install python
RUN mkdir -p ~/miniconda3
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
RUN bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
RUN rm ~/miniconda3/miniconda.sh
RUN source ~/miniconda3/bin/activate
RUN conda init --all
RUN source /root/.bashrc
RUN conda create -n app python=3.9 pip -y
RUN conda activate app

# Get current app from GitHub
WORKDIR /app
RUN git clone https://github.com/1982FenceHopper/openaches .

# Install App Deps
RUN bun install
RUN pip install -r python/requirements.txt --root-user-action=ignore

# Expose python server port
EXPOSE 15411

# Run app
ENTRYPOINT [ "bun", "run", "dev" ]