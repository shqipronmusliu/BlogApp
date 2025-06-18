import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function NewsCard({ title, description }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
