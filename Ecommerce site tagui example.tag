https://widget.cityhive.net/store_front.html#/widget/5ba7d337b77cb36d0a2d2e7c/search?query_params=%7B%22additional_properties%5Btype%5D%5B%5D%22:%5B%22Spirits%22%5D,%22include_price_range%22:true,%22skip%22:0,%22limit%22:18%7D&nav_path=%5B%7B%22title%22:%22All%20Products%22,%22query%22:%7B%22include_price_range%22:true,%22merchant_id%22:%225ba7d337b77cb36d0a2d2e7c%22,%22api_key%22:%22e0d3a091dc0d81547d6e168be2b3492a%22,%22sdk_guid%22:%2202104761-4ea3-06b1-1b83-eaad51a01467%22,%22skip%22:0,%22limit%22:18%7D,%22id%22:%22All%20Products%22%7D,%7B%22title%22:%22Spirits%22,%22query%22:%7B%22additional_properties%5Btype%5D%5B%5D%22:%5B%22Spirits%22%5D,%22include_price_range%22:true,%22skip%22:0,%22limit%22:18%7D,%22id%22:%22Spirits%22,%22filter%22:true%7D%5D
wait 2
Belmontbev = '"No","Bel"\r\n'
dump `Belmontbev` to bev.csv
for a from 1 to infinity
{
if present ('//button[@class="button ch-btn nav-button"]')
{
list = count('//div[@class="ch-product-name"]')
echo `list`
for (n=1; n<=list; n++)
{
read (//div[@class="ch-product-name"])['+n+'] to name
read (//div[@class="ch-product-options"])['+n+'] to size
read (//div[@class="ch-product-price"])['+n+'] to price
echo `name`  `size` `price`
record = '"' + name + '","' + size + '","' + price +'"'
write `record` to bev.csv
}
dom window.scrollTo(0, 500);
if ( a == 1 )
{
  click (//button[@class="button ch-btn nav-button"])[1]
}
if ( a != 1 )
{
  click (//button[@class="button ch-btn nav-button"])[2]
} 
}
}