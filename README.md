# 🏄 Surf Conditions — Frontend

Interface web para consultar condições de surfe em qualquer praia do mundo, com previsão de 7 dias, score por hora e seleção por mapa.

## 🔗 Links

- **App em produção:** https://frontend-surfe.vercel.app
- **Repositório da API:** https://github.com/seu-usuario/surf-api

---

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Leaflet + React Leaflet
- Lucide React (ícones)

---

## 📁 Estrutura do projeto

```
src/
  App.tsx                     # Componente principal
  types/
    surf.ts                   # Interfaces TypeScript
  services/
    geocoding.ts              # Integração com Nominatim (busca por nome)
  utils/
    groupByDay.ts             # Agrupamento e resumo por dia
  components/
    DayCard.tsx               # Card com resumo do dia
    DayModal.tsx              # Modal com detalhes hora a hora
    MapPicker.tsx             # Mapa interativo para seleção de localização
```

---

## ✨ Funcionalidades

- 🔍 **Busca por nome** — pesquise qualquer praia do mundo pelo nome
- 🗺️ **Seleção no mapa** — clique diretamente no mapa para escolher a localização
- 📅 **Previsão de 7 dias** — cards com resumo diário de condições
- 🕐 **Detalhes por hora** — modal com score e dados hora a hora
- 🏆 **Score de 1 a 10** — indica a qualidade das condições para surfe

---

## ⚙️ Como rodar localmente

**1. Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/surf-frontend.git
cd surf-frontend
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Rode em modo desenvolvimento:**

```bash
npm run dev
```

O app vai estar disponível em `http://localhost:5173`.

> ⚠️ Para rodar localmente, a [API](https://github.com/seu-usuario/surf-api) também precisa estar rodando em `http://localhost:3333`. Lembre de atualizar a URL no `App.tsx`.

---

## 🌐 Serviços externos utilizados

- [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org/) — conversão de endereço para coordenadas (gratuito, sem chave de API)
- [OpenStreetMap](https://www.openstreetmap.org/) — tiles do mapa interativo (gratuito)
- [Surf Conditions API](https://api-surfe.onrender.com) — dados de ondas e scores
