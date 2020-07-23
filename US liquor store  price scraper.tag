http://www.bcliquorstores.com/product-catalogue?category=spirits&sort=name.raw:asc&page=1
Title = "Prices"
Bc = '"No","bcliquor"\r\n'
dump `Bc` to bc.csv
for (p=2; p<=50; p++)
{
 for a from 1 to infinity
 { 
  wait 1
  if present ('//h3[@class="product-name"]')
  break
 }
  for (n=1; n<=24; n++)
  {
   read (//h3[@class="product-name"])['+n+'] to name
   read (//div[@class="product-subtext"])['+n+'] to size
   read (//div[@class="onsale-product-price"])['+n+'] to price
   echo `name`  `size` `price`
   record = '"' + name + '","' + size + '","' + price +'"'
   write `record` to bc.csv   
   }
 wait 2
 http://www.bcliquorstores.com/product-catalogue?category=spirits&sort=name.raw:asc&page='+p+'
}