# karaokeparty

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Deployment

Get access to a ssh shell and get the public ip for the server.


```shell
sudo adduser --disabled-password github-actions
```

Create ssh key for the `github-actions` user
```shell
ssh-keygen -t rsa -b 4096 -f id
# copy the public key to ~/.ssh/authorized_keys of the remote github-actions user
cat id.pub
```

Login via ssh to the new `github-actions` user.

```shell
ssh -i id github-actions@<ip>
```

| Environment variable | value                 |
| -------------------- |-----------------------|
| `SSH_KNOWN_HOSTS`    | `ssh-keyscan <ip>`    |
| `SSH_PRIVATE_KEY`    | `cat id`              |
| `SSH_HOST`           | `github-actions@<ip>` |

