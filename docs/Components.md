## Components la isticmaali karo

SomCheat wuxuu isticmaalaa **MDX (Markdown + JSX)** si loogu sameeyo cheatsheets modular ah. Waxaa kuu diyaar ah Components fudud oo aad isticmaali karto si aad u sameyso cheatsheet cusub adigoon wax badan ka fekerin qaab dhismeedka.

### Folder Structure - Cheatsheets Folder

```
src/
├── pages/
│   └── cheatsheets/
│       ├── index.astro
│       ├── js.mdx
│       └── lua.mdx
```

### Components la Heli Karo:

| Component   | Sharaxaad                                             |
| ----------- | ----------------------------------------------------- |
| `Intro`     | Hordhac guud (ka baxsan structure-ka kale)            |
| `Structure` | Qaab dhismeedka guud ee isku xidhaya qeybaha mawduuca |
| `Section`   | Qayb u gaar ah mawduuc kasta                          |
| `Code`      | Koodh ama tusaale code                                |
| `Link`      | Refereces / Tixraaca                                 |
| `Message`   | Digniin, Alert, ama Error fariin ah                   |

---

### Tusaale: Side loo so import-gareyo Components:

Si aad u isticmaasho components-ka sida `Intro`, `Structure`, `Section`, iyo kuwo kale gudaha mashruucaaga, waa inaad marka hore **import** ka sameysid components-kaas:

**1. Soo Import garee `Intro` component:**

```js
import Intro from "../../Components/Intro.astro";
```

**2. Soo Import garee `Structure` component:**

```js
import Structure from "../../Components/Structure.astro";
```

**3. Soo Import garee `Section` component:**

```js
import Section from "../../Components/Section.astro";
```

**4. Soo Import garee `Code` component:**

```js
import Code from "../../Components/Code.astro";
```

**5. Soo Import garee `Message` component:**

```js
import Message from "../../Components/Message.astro";
```

**6. Soo Import garee `Link` component:**

```js
import Link from "../../Components/Link.astro";
```