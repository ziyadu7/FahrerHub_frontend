import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import DashRentTable from './dashRentTable';
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import DashCard from './dashCard';
import Loader from '../user/loader';
import { useNavigate } from 'react-router-dom';
import errorFunction from '../../helpers/erroHandling';

function Home() {
  const [rentDetails, setRentDetails] = useState([])
  const [clubCount, setClubCount] = useState(0)
  const [bikeCount, setBikesCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [rentGrap, setRentGraph] = useState([])
  const { token } = useSelector((store) => store.SuperAdmin)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/admin/getDashbord', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setRentDetails(res?.data?.rents)
      setBikesCount(res?.data?.bikeCount)
      setClubCount(res?.data?.clubCount)
      setUserCount(res?.data?.userCount)
      setRentGraph(res?.data?.rentGrap)
      setLoader(false)
    }).catch((err) => {
      errorFunction(err,navigate)
    })
  }, [])

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (rentGrap.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      const data = {
        labels: rentGrap.map((rent) => rent.bikeName),
        datasets: [
          {
            label: 'Rent Amounts',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: rentGrap.map((rent) => rent.totalRent),
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data,
        options,
      });
    }

  }, [rentDetails]);

  const options = {
    maintainAspectRatio: false, // Set this option to false for responsiveness
    responsive: true, // This is not related to 'chartjs-plugin-responsive', but a built-in option for responsiveness
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>{loader ? <Loader bg={'white'} colour={'black'} /> :
      <div className="min-h-screen w-full ">
        <Toaster toastOptions={3000} />
        <header className="bg-white ps-5 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Rent Bike Details Card */}
              <DashCard userCount={userCount} />
              <DashCard bikeCount={bikeCount} />
              <DashCard clubCount={clubCount} />
            </div>

            {/* Rent Details Table */}
            <div className="mt-8 bg-white shadow rounded-lg">
              <DashRentTable rentDetails={rentDetails} />
            </div>

            {/* Chart */}
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900">Rent Details Chart</h2>
                <div className="mt-4 flex justify-center">
                  <div className='md:w-11/12 w-full'>
                    <canvas className='w-3/4' ref={chartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    }</>
  )
}

export default Home