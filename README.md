# Ecommerce

This project simulate a customer path in an ecommerce. 

It's build with ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white).

You can see a demo [here](http://146.235.60.74:3456/).

There is an API swagger documentation [here](http://146.235.60.74:5000/swagger/doc)

Requirements to run it locally:
 - ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) - this [script](https://github.com/docker/docker-install?tab=readme-ov-file) is a convenience for install it in linux distros.

Once the requirements are met, follow the steps:

1. Clone this repo:

```git clone https://github.com/helloandr3/ecommerce.git```

2.  Get into it:

``` cd ecommerce```

3. Run 

``` docker compose up --build ```

4. Access in your browser:

``` http://localhost:3456 ```