import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { articles } from "./mock";
import { MarkdownViewer } from "../common/markdown-viewer";
export const DisplayArticlesHome = () => {
  return (
    <Card className="border-2 border-redsuperlig bg-gradient-to-r from-red-700 to-red-500 shadow-lg min-h-[400px]">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3  lg:grid-cols-[400px_200px_auto]">
          {/* Article Principal */}
          <Card className="overflow-hidden shadow-none  bg-transparent !border-none text-white">
            <CardContent className="space-y-4 !p-0">
              <div className="relative w-[95%]  rounded-lg overflow-hidden">
                <Image
                  src={`/blog/article1.jpg`}
                  alt="Article 1"
                  width={400}
                  height={400}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="space-y-4 md:px-6">
                <h2 className="text-lg font-bold md:text-xl ">
                  <Link href={"#"}>{articles[0].title}</Link>
                </h2>
                <div className="text-sm italic">Publié le 13 octobre 2024</div>
                <article>
                  <MarkdownViewer
                    markdown={articles[0].content.slice(0, 130) + " ..."}
                  />
                </article>
                <Link href={"#"} className="inline-block hover:underline">
                  Lire la suite →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Articles Récents */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {articles
                .filter((_, index) => index !== 0)
                .slice(0, 3)
                .map((article, index) => (
                  <Card
                    key={article.id}
                    className="p-0 overflow-hidden text-white transition-colors bg-transparent border-none shadow-none"
                  >
                    <CardContent className="!p-0">
                      <div className="flex flex-col gap-2">
                        <div className="relative flex-shrink-0 w-full overflow-hidden">
                          <Image
                            src={
                              index === 1
                                ? "/blog/article2.jpg"
                                : index === 2
                                ? "/blog/article3.jpg"
                                : "/blog/article4.jpg"
                            }
                            alt={article.title}
                            width={200}
                            height={200}
                            className=" transition-transform duration-300 rounded-md hover:scale-110 "
                          />
                        </div>
                        <h3 className="text-xs font-semibold ">
                          <Link href={`#`}>{article.title}</Link>
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
          {/* Twitters */}
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};
