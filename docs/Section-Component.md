## Component-ka 3aad: `Section`

`Section` waxaa loo isticmaalaa in lagu kala saaro ama lagu **qeexo qayb kasta oo mawduuc gaar ah** ah sida *variables*, *loops*, *functions*, iwm. Waxa uu ka shaqaynayaa gudaha `Structure`.

---

### Qaabka Isticmaalka (`Syntax`):

```mdx
<Section>
  Qoraal, code, fariimo, iyo links halkan geli
</Section>
```

---

### Properties:

`Section` **ma laha props** – waxay si toos ah u qabataa waxa ku jira dhexdeeda.

---

### Fiiro Gaar ah:

* Waxaa laga dhigi karaa in kastoo aad rabto – sida sections badan: "Variables", "Loops", "Functions", iwm.
* Waxa ku dhex jiri kara: qoraal markdown ah, `<Code>`, `<Message>`, `<Link>`, `<Intro>` (haddii la rabay) iyo wax walba oo la xidhiidha qeybtaas.

---

### Tusaale:

```mdx
<Section>
  ## Loops (Wareegyo)

  Loops waa qaab aad ugu celin karto code marar badan adigoon si buuxda u qorayn mar kasta.

  <Code>
    ```js
    for (let i = 0; i < 5; i++) {
      console.log("Tirada waa: " + i);
    }
    ```
  </Code>

  <Message type="alert">
    Haddii aad isticmaaleyso `while` loop, iska ilaali in loop-ku uu noqdo mid aan dhamaanayn.
  </Message>

  <Link
    title="Loops in JavaScript"
    url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
    description="Macluumaad dheeraad ah oo ku saabsan Loops."
  />
</Section>
```