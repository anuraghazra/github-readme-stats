const { encodeHTML } = require("./common/utils");

const statCardLocales = ({ name, apostrophe }) => {
  return {
    "statcard.title": {
      cn: `${encodeHTML(name)}的GitHub统计`,
      de: `${encodeHTML(name) + apostrophe} GitHub-Statistiken`,
      en: `${encodeHTML(name)}'${apostrophe} GitHub Stats`,
      es: `Estadísticas de GitHub de ${encodeHTML(name)}`,
      fr: `Statistiques GitHub de ${encodeHTML(name)}`,
      it: `Statistiche GitHub di ${encodeHTML(name)}`,
      ja: `${encodeHTML(name)}のGitHub統計`,
      kr: `${encodeHTML(name)}의 GitHub 통계`,
      "pt-br": `Estatísticas do GitHub de ${encodeHTML(name)}`,
    },
    "statcard.totalstars": {
      cn: "总星数",
      de: "Sterne Insgesamt",
      en: "Total Stars",
      es: "Estrellas totales",
      fr: "Total d'étoiles",
      it: "Stelle totali",
      ja: "星の合計",
      kr: "총 별",
      "pt-br": "Total de estrelas",
    },
    "statcard.commits": {
      cn: "总承诺",
      de: "Anzahl Commits",
      en: "Total Commits",
      es: "Compromisos totales",
      fr: "Total des engagements",
      it: "Commit totali",
      ja: "総コミット",
      kr: "총 커밋",
      "pt-br": "Total de compromissos",
    },
    "statcard.prs": {
      cn: "总公关",
      de: "PRs Insgesamt",
      en: "Total PRs",
      es: "RP totales",
      fr: "Total des PR",
      it: "PR totali",
      ja: "合計PR",
      kr: "총 PR",
      "pt-br": "Total de PRs",
    },
    "statcard.issues": {
      cn: "总发行量",
      de: "Anzahl Issues",
      en: "Total Issues",
      es: "Problemas totales",
      fr: "Nombre total de problèmes",
      it: "Segnalazioni totali",
      ja: "総問題",
      kr: "총 문제",
      "pt-br": "Total de problemas",
    },
    "statcard.contribs": {
      cn: "有助于",
      de: "Beigetragen zu",
      en: "Contributed to",
      es: "Contribuido a",
      fr: "Contribué à",
      it: "Ha contribuito a",
      ja: "に貢献しました",
      kr: "에 기여하다",
      "pt-br": "Contribuiu para",
    },
  };
};

const repoCardLocales = {
  "repocard.template": {
    cn: "模板",
    de: "Vorlage",
    en: "Template",
    es: "Modelo",
    fr: "Modèle",
    it: "Template",
    ja: "テンプレート",
    kr: "주형",
    "pt-br": "Modelo",
  },
  "repocard.archived": {
    cn: "已封存",
    de: "Archiviert",
    en: "Archived",
    es: "Archivé",
    fr: "Archivé",
    it: "Archiviata",
    ja: "アーカイブ済み",
    kr: "보관 됨",
    "pt-br": "Arquivada",
  },
};

const langCardLocales = {
  "langcard.title": {
    cn: "最常用的语言",
    de: "Meist verwendete Sprachen",
    en: "Most Used Languages",
    es: "Idiomas más usados",
    fr: "Langues les plus utilisées",
    it: "Linguaggi più utilizzati",
    ja: "最もよく使われる言語",
    kr: "가장 많이 사용되는 언어",
    "pt-br": "Línguas Mais Usadas",
  },
};

const wakatimeCardLocales = {
  "wakatimecard.title": {
    cn: "Wakatime周统计",
    de: "Wakatime Wochen Status",
    en: "Wakatime Week Stats",
    es: "Estadísticas de la semana de Wakatime",
    fr: "Statistiques de la semaine Wakatime",
    it: "Statistiche della settimana di Wakatime",
    ja: "ワカタイムウィーク統計",
    kr: "Wakatime 주간 통계",
    "pt-br": "Estatísticas da semana Wakatime",
  },
  "wakatimecard.nocodingactivity": {
    cn: "本周没有编码活动",
    de: "Keine Aktivitäten in dieser Woche",
    en: "No coding activity this week",
    es: "No hay actividad de codificación esta semana",
    fr: "Aucune activité de codage cette semaine",
    it: "Nessuna attività in questa settimana",
    ja: "今週のコーディング活動はありません",
    kr: "이번 주 코딩 활동 없음",
    "pt-br": "Nenhuma atividade de codificação esta semana",
  },
};

module.exports = {
  statCardLocales,
  repoCardLocales,
  langCardLocales,
  wakatimeCardLocales,
};
