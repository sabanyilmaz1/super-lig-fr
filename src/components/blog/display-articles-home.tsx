import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { articles } from "./mock";
import { MarkdownViewer } from "../common/markdown-viewer";
export const DisplayArticlesHome = () => {
  return (
    <Card className="border-2 border-redsuperlig bg-gradient-to-r from-red-700 to-red-500 shadow-lg min-h-[400px] rounded-t-none rounded-b-lg">
      <CardContent className="mt-6">
        <div className="grid grid-cols-1 gap-3  lg:grid-cols-[700px_auto]">
          {/* Article Principal */}
          <Card className="overflow-hidden shadow-none  bg-transparent !border-none text-white">
            <CardContent className="space-y-4 !p-0">
              <div className="relative w-[95%]  rounded-lg overflow-hidden">
                <Image
                  src={`/blog/article1.png`}
                  alt="Article 1"
                  width={700}
                  height={200}
                  className="transition-transform duration-300 hover:scale-110 max-h-[250px]"
                />
              </div>
              <div className="space-y-4 md:px-6">
                <h2 className="text-base font-bold md:text-lg ">
                  <Link href={"#"}>{articles[0].title}</Link>
                </h2>
                <div className="text-sm italic">Publié le 13 octobre 2024</div>
                <article className="!text-xs max-w-sm">
                  <MarkdownViewer
                    markdown={articles[0].content.slice(0, 180) + " ..."}
                  />
                </article>
                <Link
                  href={"#"}
                  className="inline-block hover:underline text-sm md:text-base"
                >
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
                            width={250}
                            height={200}
                            className="max-h-[80px] md:max-h-[100px] transition-transform duration-300 rounded-md hover:scale-110 "
                          />
                        </div>
                        <h3 className="text-xs font-semibold max-w-[250px] ">
                          <Link href={`#`}>{article.title}</Link>
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
