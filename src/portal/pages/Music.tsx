import React from 'react'
import Hero from "@public/components/listings/Hero";
import { musicData } from "@public/data/music.data";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@public/components/ui/table";
import { Music, Play } from "lucide-react";

export default function MusicPage() {
  return (
    <>
      <Hero {...musicData.hero} />

      {/* Playlist Section */}
      <section className="mx-auto px-6  md:px-10 my-6 mb-0">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-8 h-8 text-gold" />
              <h2 className="text-3xl md:text-4xl font-bold font-antigua uppercase text-gold">
                Cartagena Playlist
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Your Essential Guide to Cartagena's Musical Soul
            </p>
          </div>

          {/* Playlist Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className='bg-gold'>
                <TableRow className="">
                  <TableHead className="w-12 text-center font-bold text-white">#</TableHead>
                  <TableHead className="font-bold text-white">TITLE</TableHead>
                  <TableHead className="font-bold text-white">ALBUM</TableHead>
                  <TableHead className="font-bold hidden md:table-cell text-white">DATE</TableHead>
                  {/* <TableHead className="w-12 text-center font-bold text-white">♥</TableHead> */}
                  <TableHead className="w-16 text-center font-bold text-white">DURATION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {musicData.playlistSongs.map((song) => (
                  <TableRow key={song.id} className="hover:bg-green-50">
                    <TableCell className="text-center font-bold text-gray-600">
                      {song.number}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gold cursor-pointer hover:scale-125 transition" />
                        <div>
                          <p className="font-semibold text-gray-900">{song.title}</p>
                          <p className="text-xs text-gray-500">{song.artist}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{song.album}</TableCell>
                    <TableCell className="text-gray-600 hidden md:table-cell text-sm">
                      {song.date}
                    </TableCell>
                    {/* <TableCell className="text-center">
                      <div className="w-6 h-6 rounded-full border-2 border-gold hover:bg-gold hover:text-white transition cursor-pointer flex items-center justify-center text-xs font-bold text-gold">
                        ♥
                      </div>
                    </TableCell> */}
                    <TableCell className="text-center text-gray-600 text-sm">
                      {song.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Music Help Section */}
      <section className="mx-auto px-6 py-4 md:px-10 mt-6-0 mb-0">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gold font-antigua text-center mb-16 uppercase">
            Cartagena Help Music
          </h2>

          <div className="space-y-13">
            {musicData.musicSections.map((section, index) => (
              <div key={index} className="space-y-6">
                {/* Section Header */}
                <div className="">
                  <h3 className="text-3xl md:text-3xl text-gold font-bold font-antigua mb-2">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-xl text-gold font-semibold">{section.subtitle}</p>
                  )}
                </div>

                {/* Content with Image */}
                <div className="grid grid-cols-1 md:grid-cols-1  items-center">
                  {/* {index % 2 === 0 ? (
                    <>
                      <div>
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                          {section.description}
                        </p>
                        {section.content && (
                          <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {section.content}
                          </p>
                        )}
                        {section.topics && (
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">Key Topics:</p>
                            <ul className="space-y-1">
                              {section.topics.map((topic, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  <span className="w-2 h-2 bg-gold rounded-full" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <> */}
                      <>
                        <p className="text-gray-700 text-base  mb-4">
                          {section.description}
                        </p>
                        {section.content && (
                          <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {section.content}
                          </p>
                        )}
                        {section.topics && (
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">Key Topics:</p>
                            <ul className="space-y-1">
                              {section.topics.map((topic, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  <span className="w-2 h-2 bg-gold rounded-full" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                      {/* <div>
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                      </div> */}
                    {/* </>
                  )} */}
                </div>

                {/* Divider */}
                {index < musicData.musicSections.length - 1 && (
                  <hr className="border-t-2 border-gray-200 my-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
    </>
  );
}
