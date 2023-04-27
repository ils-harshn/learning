import pandas as pd
from products.models import Product
from random import randint
from tqdm import tqdm



def from_csv_to_model(path):
    convertInt = lambda x: float(x.replace("₹", "").replace(",", "").replace("%", "").replace("|", ""))

    data = pd.read_csv(path)
    csv = list(zip(data.product_name, data.actual_price, data.discounted_price, data.discount_percentage, data.rating, data.about_product, data.img_link))
    for item in tqdm(csv):
       try:
           rating = convertInt(item[4])
       except:
           rating = randint(1, 5)
           Product(title=item[0][:250], quantity=randint(1, 200), price=convertInt(item[1]), discounted_price=convertInt(item[2]), discount_percentage=convertInt(item[3]), rating=rating, about_product=item[5], img_url=item[6]).save()