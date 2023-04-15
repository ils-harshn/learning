### Deployment on pythonanywhere.com

+ First clone the git repo with the help of bash.
+ Install requirements from requirements.txt
+ In web tab, open WSGI configuration file and set the following configurations.
    * project_home
    * os.environ['DJANGO_SETTINGS_MODULE']
+ Open settings.py and add following configuration
    * ALLOWED_HOSTS = ['domain']
    * CORS_ALLOW_ALL_ORIGINS = True
    * STATIC_ROOT = '/home/cartJSHarshIls/cartJS_API/static'
+ Click on reload button in Web Tab.