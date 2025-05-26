
document.addEventListener("DOMContentLoaded", () => {
  const nivelSelect = document.getElementById("nivel");
  atualizarExplicacaoTeorica(nivelSelect.value);
  nivelSelect.addEventListener("change", () => atualizarExplicacaoTeorica(nivelSelect.value));
  atualizarHistorico();
  document.getElementById("frequencia").addEventListener("change", atualizarDivisoes);
  document.getElementById("objetivo").addEventListener("change", atualizarDivisoes);
});
