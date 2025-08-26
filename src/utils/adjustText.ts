function adjustText(text: string): string | null {
  return (
    text &&
    text
      .split("_")
      .map((value: string) => {
        value = value.replace("_", "").replace(/\band\b/gi, "&");
        return value ? value[0].toUpperCase() + value.slice(1) : null;
      })
      .join(" ")
  );
}

export default adjustText;