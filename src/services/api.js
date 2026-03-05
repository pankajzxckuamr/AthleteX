import { athletes, feedPosts, trendingAthletes, trendingNews, liveMatches, notifications } from "../data/mockData";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async getAthletes({ sport = "All Sports", search = "" } = {}) {
    await delay(350);
    let list = [...athletes];
    if (sport && sport !== "All Sports") {
      list = list.filter((a) => a.sport === sport);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.sport.toLowerCase().includes(q) ||
          a.team.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getAthleteById(id) {
    await delay(250);
    const found = athletes.find((a) => a.id === Number(id));
    if (!found) throw new Error("Athlete not found");
    return found;
  },

  async getFeed({ athleteIds = [] } = {}) {
    await delay(500);
    if (athleteIds.length === 0) return [...feedPosts];
    return feedPosts.filter((p) => athleteIds.includes(p.athleteId));
  },

  async getFeedForAthlete(athleteId) {
    await delay(350);
    return feedPosts.filter((p) => p.athleteId === Number(athleteId));
  },

  async getTrending() {
    await delay(250);
    return { athletes: trendingAthletes, news: trendingNews, liveMatches };
  },

  async getNotifications() {
    await delay(150);
    return notifications;
  },

  async search(query) {
    await delay(450);
    const q = query.toLowerCase();
    const matchedAthletes = athletes.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.sport.toLowerCase().includes(q) ||
        a.team.toLowerCase().includes(q)
    );
    const matchedPosts = feedPosts.filter(
      (p) =>
        p.athleteName.toLowerCase().includes(q) ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q)
    );
    return { athletes: matchedAthletes, posts: matchedPosts };
  },
};
