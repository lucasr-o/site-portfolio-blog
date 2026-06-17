import React from "react";
import Markdoc, { type Node, type Config } from "@markdoc/markdoc";
import { CodeBlock } from "@/components/CodeBlock";
import { PostImage } from "@/components/PostImage";

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function collectText(node: Node): string {
  if (node.type === "text") return (node.attributes?.content as string) ?? "";
  let text = "";
  for (const child of node.children ?? []) text += collectText(child);
  return text;
}

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function getToc(ast: Node): TocItem[] {
  const items: TocItem[] = [];
  function walk(node: Node) {
    if (node.type === "heading") {
      const level = node.attributes?.level as number;
      if (level === 2 || level === 3) {
        const text = collectText(node);
        if (text) items.push({ level, text, id: slugify(text) });
      }
    }
    for (const child of node.children ?? []) walk(child);
  }
  walk(ast);
  return items;
}

const markdocConfig: Config = {
  nodes: {
    heading: {
      children: ["inline"],
      attributes: { level: { type: Number, required: true } },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const id = slugify(collectText(node));
        const level = node.attributes.level as number;
        return new Markdoc.Tag(`h${level}`, { ...attributes, id }, children);
      },
    },
    fence: {
      attributes: {
        content: { type: String },
        language: { type: String },
      },
      transform(node) {
        return new Markdoc.Tag(
          "CodeBlock",
          {
            content: node.attributes.content as string,
            language: node.attributes.language as string,
          },
          []
        );
      },
    },
    image: {
      attributes: {
        src: { type: String },
        alt: { type: String },
        title: { type: String },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        return new Markdoc.Tag("PostImage", attributes, []);
      },
    },
    link: {
      attributes: {
        href: { type: String },
        title: { type: String },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const href = String(node.attributes.href ?? "");
        const external = /^https?:\/\//.test(href);
        return new Markdoc.Tag(
          "a",
          { ...attributes, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) },
          children
        );
      },
    },
  },
};

export function renderMarkdoc(raw: string) {
  const ast = Markdoc.parse(raw);
  const content = Markdoc.transform(ast, markdocConfig);
  const toc = getToc(ast);
  const rendered = Markdoc.renderers.react(content, React, {
    components: { CodeBlock, PostImage },
  });
  return { rendered, toc };
}
