function adjustText(text: string): string {
  return (
    text &&
    text
      .split("_")
      .map((value: string) => {
        value = value.replace("_", "").replace(/\band\b/gi, "&");
        return typeof value[0] === "string" ? value[0].toUpperCase() + value.slice(1): null;
      })
      .join(" ")
  );
}

export default adjustText;