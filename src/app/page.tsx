import Header from "./components/Header";

export default function Home() {
  return (
    <>

      <section className="bg-gray-900 min-h-screen mt-auto">
        <Header />

        <div className="pt-20 mx-auto max-w-7xl">
          <h1>
            Welcome everyone
          </h1>
          <div className="mt-10 flex flex-wrap justify-between w-full gap-10">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(nb => (
                <div key={nb} className="w-[300px] h-[200px] text-black bg-red-100 grid place-content-center">
                  <h1>Mock data</h1>
                </div>
              ))
            }

          </div>
        </div>


      </section>

    </>
  );
}
