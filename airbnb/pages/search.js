import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { format } from "date-fns";
import InfoCard from "/components/InfoCard";
import Map from "@/components/Map";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMMM")
    : "Flexible start date";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMMM")
    : "Flexible end date";
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${location}           |           ${range}           |           ${noOfGuests} Guests`}
      />

      <main className="flex">
        <section className="pt-14 px-6 w-10/12">
          <p className="text-xs">
            {range} for {noOfGuests} Guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Retreats in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-wrap">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} location={location} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  let results = await fetch("https://www.jsonkeeper.com/b/RINN");
  const searchResults = await results.json();

  return {
    props: {
      searchResults,
    },
  };
}
