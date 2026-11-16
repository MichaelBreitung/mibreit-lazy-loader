# Dockerfile.base in this 
FROM mibreit/mibreit-homepage-builder:0.5.0 

ARG UID=${UID:-1000}
ARG GID=${GID:-1000}
ARG USER=${USER:-developer}

ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Ubuntu 24.04 ships a default "ubuntu" user with UID/GID 1000, which would collide
RUN (id -u ubuntu > /dev/null 2>&1 && userdel -r ubuntu || true) && \
  groupadd -g $GID $USER && \
  useradd -d /home/$USER -s /bin/bash -m $USER -l -u $UID -g $GID && \
  echo "$USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USER && \
  chmod 0440 /etc/sudoers.d/$USER

USER $USER

# Highlight Branch in Bash for new user
RUN echo "parse_git_branch() {" >> ~/.bashrc && \
  echo "  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'" >> ~/.bashrc && \
  echo "}" >> ~/.bashrc && \
  echo "export PS1='\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ '" >> ~/.bashrc

# Completion for Taskfile
RUN echo 'eval "$(task --completion bash)"' >> ~/.bashrc

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["sleep", "infinity"]