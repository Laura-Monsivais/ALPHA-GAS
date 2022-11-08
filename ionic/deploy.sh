##sh deploy.sh
#Compilar
ng build --prod

#Copiar carpeta todos los archivos de la carpeta www a la carpeta public_html
yes|cp -rf www/. ../../