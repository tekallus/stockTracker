export default function Stock({
  stockName,
  currentPrice,
  prevClosingPrice,
  logo
}) {
  // Verilerin string olup olmadığını kontrol etmek ve sayısal değere dönüştürmek için yardımcı parseNumber fonksiyon yazalim
  // parseNumber fonksiyounu (value) parametre alır .
  //Bu parametre, bir string veya sayısal bir ifade olabilir.
  //Fonksiyon, bu değeri parseFloat fonksiyonu stringden sayıya çevirir.
  //parseFloat fonksiyonu,string içinde sayısal karakterlerden başka karakterler de bulunsada sadece sayisal deger dondurur.
  //Daha sonra, toFixed(2) metoduyla bu sayıyı ondalık kısmını en fazla iki basamak olacak şekilde düzenler.
  //toFixed(2) metodu, number değişkenindeki sayıyı en fazla iki ondalık basamağa düzenleyerek "...." string'ini üretir.
  const parseNumber = (value) => parseFloat(value).toFixed(2);

  // Sayısal değişim hesaplamak için yardımcı fonksiyon
  const calculateNumericalChange = (current, prev) =>
    parseNumber(current - prev);

  // Yüzde değişimi hesaplamak için yardımcı fonksiyon
  const calculateRateChange = (current, prev) =>
    parseNumber(((current - prev) / prev) * 100);

  // Renk sınıfını belirlemek için yardımcı fonksiyon
  const getColorClass = (change) => {
    if (change > 0) return "green";
    if (change < 0) return "red";
  };

  // Ok karakterini belirlemek için yardımcı fonksiyon
  const getArrow = (change) => {
    if (change > 0) return "⬆";
    if (change < 0) return "⬇";
    return "▬";
  };

  //1) Numerical ve rate change değerlerini hesaplamak icin calculateNumericalChange(currentPrice, prevClosingPrice)
  const numericalChange = calculateNumericalChange(
    parseNumber(currentPrice),
    parseNumber(prevClosingPrice)
  );
  //1) ayni islemi rate change yapalim
  const rateChange = calculateRateChange(
    parseNumber(currentPrice),
    parseNumber(prevClosingPrice)
  );

  // ColorClass, Arrow ve Current Price'a göre renk ve ok değerlerini belirlemek
  const colorClass = getColorClass(numericalChange);
  const arrow = getArrow(numericalChange);

  /* Challenge

    Aşağıdaki değişkenler şu anda verilerle sabit kodlanmıştır. Sizin göreviniz aşağıdakileri yaparak bunları dinamik olarak oluşturulmuş değerlere dönüştürmektir: 
    
        1. İlk dört değişkenin değerleri - stockName, currentPrice, prevClosingPrice ve logo - stock adlı 
        prop aracılığıyla bileşene aktarılan karşılık gelen değerler olmalıdır.
         (currentPrice ve prevClosingPrice için sayılar stringe dönüştürülmelidir).  
           
        2. Diğer dört değişken - numericalChange, rateChange, arrow ve colorClass - 
        iki fiyat değerine göre aşağıdaki gibi belirlenmelidir: 


           
           Değişken		                            Değer 				  
			╷-------------------╷---------------------------------------------------------------╷
			|  numericalChange  |  CurrentPrice ile prevClosingPrice arasındaki fark            |  
			|-------------------|---------------------------------------------------------------|
			|  rateChange       | Fiyatın prevClosingPrice'a göre % olarak yükseldiğini veya    |
      |                   | düştüğünü temsil eden bir string'e dönüştürülmüş bir sayı     |   
			|-------------------|---------------------------------------------------------------|
			|  colorClass       | hisse senedi değer kazandıysa "yeşil"                         |
      |                   | hisse senedi değer kaybetmişse "kırmızı"                      |
      |                   | hisse senedi değerini koruduysa undefined                     |
			|-------------------|---------------------------------------------------------------|
			|  arrow            | Hisse senedi değer kazandıysa  "⬆"                            |
      |                   | Hisse senedi değer kaybetmişse "⬇"                            |
      |                   | Hisse senedi değerini koruduysa "▬"	                          |	
			¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯	

        3. numericalChange ve rateChange öğelerinin her ikisi de ondalık basamağın yüzde birine kadar temsil edilen sayılar olmalı ve bu sayılar yuvarlanmalıdır. Örneğin, 5 -> 5.00, 0 -> 0.00, 52.1 -> 52.10 ve 84.119 -> 84.12. 
           
        4. Değişkenler aşağıdakinden daha verimli bir şekilde ayarlanabilir. Ekrana yansıtılan son değerler istediğiniz gibi olduğu sürece, değişkenlerin ayarlanma şeklini istediğiniz gibi değiştirebilirsiniz. Okunabilirliği korurken kodunuzu olabildiğince kısa ve DRY (Kendinizi Tekrar Etmeyin) yapmaya çalışın.
           
        Not: Sayıların stringlere dönüştürülmesiyle ilgili kısmı fazla düşünmeyin. Nasıl yaklaştığınıza bağlı olarak, bu challenge'ı çözerken  muhtemelen otomatik olarak gerçekleşecektir. 
*/

  return (
    <div className="stock-container">
      <div className={colorClass}>
        <p>
          {arrow}
          {numericalChange}
        </p>
        <p>{rateChange}%</p>
      </div>
      <div>
        <img className="logo" src={logo} />
      </div>
      <div>
        <p>{stockName}</p>
      </div>
      <div>
        <p>${currentPrice}</p>
        <p>Güncel Fiyat</p>
      </div>
      <div>
        <p>Önceki Kapanış: ${prevClosingPrice}</p>
      </div>
    </div>
  );
}
