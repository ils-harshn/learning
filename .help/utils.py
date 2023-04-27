import pandas as pd
from products.models import Product
from random import randint
from tqdm import tqdm
import subprocess

def from_csv_to_model(path):
    convertInt = lambda x: float(x.replace("₹", "").replace(
        ",", "").replace("%", "").replace("|", ""))

    data = pd.read_csv(path)
    csv = list(zip(data.product_name, data.actual_price, data.discounted_price,
               data.discount_percentage, data.rating, data.about_product, data.img_link))
    for item in tqdm(csv):
        try:
            rating = convertInt(item[4])
        except:
            rating = randint(1, 5)
        Product(title=item[0][:250], quantity=randint(1, 200), price=convertInt(item[1]), discounted_price=convertInt(item[2]), discount_percentage=convertInt(item[3]), rating=rating, about_product=item[5], img_url=item[6]).save()
        
def setup():
    print("Making Migrations: ")
    subprocess.run(["python", "../manage.py", "makemigrations"])
    subprocess.run(["python", "../manage.py", "migrate"])
    
    print("Creating Settings")
    settings_data = None
    with open("./data/deployment_settings.py", "r") as file:
        settings_data = file.read()
        
   with open("../cartJS/settings.py", "w") as file:
        file.write(settings_data)
    
    print("\nPlease enter the details below for superuser")
    subprocess.run(["python", "../manage.py", "createsuperuser"])
    
    print("Entering dummy data...")
    from_csv_to_model("./data/amazon.csv")
    
    print("Setup Done!")
