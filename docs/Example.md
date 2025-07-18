## Tusaale dhamaystiran oo na tusinaya sida loo isticmaalo dhammaan components

#### `js.mdx`

```mdx

import Intro from "../../Components/Intro.astro";
import Structure from "../../Components/Structure.astro";
import Section from "../../Components/Section.astro";
import Code from "../../Components/Code.astro";
import Message from "../../Components/Message.astro";
import Link from "../../Components/Link.astro";

<Intro title="JavaScript">
  JavaScript waa luuqad barnaamij oo loogu talagalay in lagu daro shaqooyin firfircoon oo bogagga webka ah. Waa luuqad dhinaca browser-ka ah oo aad muhiim ugu ah horumarka webka casriga ah.
  <Message type="warning">
    Kahor intaadan bilaabin, waxaa muhiim ah inaad faham guud ka haysato JavaScript.
  </Message>
</Intro>

<Structure>
  <Section>
    # Variables in JavaScript
    ## Deklarashanka Xogta
    `let`, `const`, iyo `var` waxaa loo isticmaalaa in lagu qeexo variables.
    
    <Code>
      ```js
      let name = "Adam";
      const age = 25;
      var city = "Hargeisa";
      console.log(name, age, city);
      ```
    </Code>
    
    <Message type="alert">
      Markaad isticmaaleyso `let` iyo `const`, waa muhiim inaad fahamto farqiga u dhexeeya labada. `const` waxaa loo isticmaalaa si loo xakameeyo qiimaha aan la bedeli karin.
    </Message>
    <Link 
      title="JavaScript MDN Docs"
      url="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      description="Halkan waxaad ka helaysaa dokumentiyada rasmiga ah ee JavaScript."
    />
  </Section>

  <Section>
    ## Functions in JavaScript
    Function-ku waa habka loo abaabulo code-ka iyo in la sameeyo hawlo gaar ah.
    <Code>
      ```js
      function greet(name) {
        return `Hello, ${name}!`;
      }
      console.log(greet("Adam"));
      ```
    </Code>
  
    <Message type="warning">
      Waa muhiim inaad si fiican u fahamto sida loo sameeyo functions si loo fududeeyo maamulka code-kaaga.
    </Message>
    
  </Section>

  <Section>
    # Arrays in JavaScript
    ## Loo yaqaan Liiska Xogta
    Arrays waxaa loo isticmaalaa in lagu keydiyo xog badan oo la xiriirta.
    <Code>
      ```js
      let fruits = ["apple", "banana", "orange"];
      fruits.push("grape");
      console.log(fruits);
      ```
    </Code>
    <Message type="error">
      Waa in aad ka digtoonaato in aad isticmaasho array-ka si aan habboonayn, gaar ahaan haddii ay tahay array waaweyn oo leh xog badan.
    </Message>
  </Section>

  <Section>
    # Functions and Methods in Arrays
    ## Methods-ka Array-ka
    Arrays waxay leeyihiin habab kala duwan sida `map()`, `filter()`, iyo `reduce()`.
    <Code>
      ```js
      let numbers = [1, 2, 3, 4, 5];
      let doubled = numbers.map(num => num * 2);
      console.log(doubled);
      ```
    </Code>
    <Message type="alert">
      Isticmaalka `map()` wuxuu ku siinayaa array cusub iyadoo la adeegsanayo hawl gaar ah oo ku saabsan xogta array-ga.
    </Message>
  </Section>
</Structure>

```
