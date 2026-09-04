"use client";

import { useEffect, useState } from "react";

export type Review = {
  id: string;
  agentId: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};

const STORAGE_KEY = "bnb-marketplace-reviews";

export function useReviews(agentId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Review[] = raw ? JSON.parse(raw) : [];
      const filtered = all.filter((r) => r.agentId === agentId);
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReviews(filtered);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  const addReview = (review: Omit<Review, "id" | "createdAt">) => {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Review[] = raw ? JSON.parse(raw) : [];
      const updated = [newReview, ...all];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }

    return newReview;
  };

  const average = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return { reviews, loading, addReview, average };
}
