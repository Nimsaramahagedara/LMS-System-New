import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import SimpleCard from '../../components/SimpleCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { calculateGrade, getTerm } from '../../utils/usefulFunctions';
import Loader from '../../components/Loader/Loader';
import { usePDF } from 'react-to-pdf';
import { Box, Button, Input, Modal, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const MyClass = () => {
  const [myClassDetails, setMyClassDetails] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: `${new Date().toUTCString().toString()}-markings.pdf` });
  const [allMarksWithTerm, setMarks] = useState({})
  const [loading, setLoading] = useState(true);
  const [firstTermMarksDist, setFirTermMarkDist] = useState([]);
  const [secondTermMarksDist, setSecTermMarkDist] = useState([]);
  const [thirdTermMarksDist, setThirTermMarkDist] = useState([]);
  const [filterMark, setFilterMark] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setModal] = useState(false)

  const getMyClass = async () => {
    try {
      setLoading(true)
      const resp = await authAxios.get(`${apiUrl}/teacher/myClass`)
      setMyClassDetails(resp.data);
      console.log(resp.data);
      const { firstTerm, secondTerm, thirdTerm } = groupSubjectMarksToTerm(resp.data?.allMarks, resp.data?.allStudents)
      setMarks({ firstTerm, secondTerm, thirdTerm })


      const { firstTermTotalMarkDetails, secondTermTotalMarkDetails, thirdTermTotalMarkDetails } = makeMarkDistribution(resp.data, { firstTerm, secondTerm, thirdTerm })
      setFirTermMarkDist(firstTermTotalMarkDetails)
      setSecTermMarkDist(secondTermTotalMarkDetails)
      setThirTermMarkDist(thirdTermTotalMarkDetails)

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getMyClass()
  }, [])

  const groupSubjectMarksToTerm = (subjectMarks, allStudents, myClass) => {
    const uniqueIds = allStudents.map(obj => obj._id); ((st) => (st._id))
    // console.log('Unique ids', uniqueIds);
    const firstTermAllSubjectAllMarks = [];
    const secontTermAllSubjectAllMarks = [];
    const thirdTermAllSubjectAllMarks = [];

    subjectMarks.forEach((subj) => {
      subj.forEach((term) => {
        if (term.term === 1) {
          firstTermAllSubjectAllMarks.push(term)
        } else if (term.term === 2) {
          secontTermAllSubjectAllMarks.push(term);
        } else {
          thirdTermAllSubjectAllMarks.push(term);
        }
      })
    })
    console.log('First Term : ', firstTermAllSubjectAllMarks);
    console.log('Second Term : ', secontTermAllSubjectAllMarks);
    console.log('Third Term : ', thirdTermAllSubjectAllMarks);



    return { firstTerm: firstTermAllSubjectAllMarks, secondTerm: secontTermAllSubjectAllMarks, thirdTerm: thirdTermAllSubjectAllMarks }

  }

  const makeMarkDistribution = (classDet, allMwithT) => {
    //make an array of students with their total marks
    const firstTermTotalMarkDetails = classDet?.allStudents?.map((student) => {

      const eachStudentTotalMark = classDet?.classModules?.reduce((total, subj) => {

        const marks = allMwithT?.firstTerm?.filter((sub) => sub?.subId === subj?._id)[0]?.marks
          .filter((mk) => mk?.studentId === student?._id)[0]?.mark || 0;
        return total + marks;

      }, 0)

      return {
        studentId: student._id,
        totalMarks: eachStudentTotalMark
      }
    })

    //make an array of students with their total marks second term
    const secondTermTotalMarkDetails = classDet?.allStudents?.map((student) => {
      const eachStudentTotalMark = classDet?.classModules?.reduce((total, subj) => {
        const marks = allMwithT?.secondTerm?.filter((sub) => sub?.subId === subj?._id)[0]?.marks
          .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
        return total + marks;
      }, 0)

      return {
        studentId: student._id,
        totalMarks: eachStudentTotalMark
      }
    })

    //make an array of students with their total marks THIRD term
    const thirdTermTotalMarkDetails = classDet?.allStudents?.map((student) => {
      const eachStudentTotalMark = classDet?.classModules.reduce((total, subj) => {
        const marks = allMwithT.thirdTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
          .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
        return total + marks;
      }, 0)

      return {
        studentId: student._id,
        totalMarks: eachStudentTotalMark
      }
    })

    return { firstTermTotalMarkDetails, secondTermTotalMarkDetails, thirdTermTotalMarkDetails }

  }


  const getTheStudentWithMax = (marks) => {

    let maxMark = -Infinity;
    let maxMarkObj = null;
    marks.forEach((obj) => {
      if (obj.totalMarks > maxMark) {
        // Update the maximum mark and its corresponding object
        maxMark = obj.totalMarks;
        maxMarkObj = obj;
      }
    });
    const maxStudent = myClassDetails?.allStudents?.filter((st) => (
      st._id === maxMarkObj?.studentId
    ))[0]


    return maxStudent.firstName + maxStudent.lastName + ' : ' + maxMarkObj.totalMarks;

  }
  const handleFilterStudentOnMark = (term) => {
    if (term == 1) {
      const filter = allMarksWithTerm.firstTerm.flatMap((sub) => (
        sub.marks.filter((mark) => mark.mark < filterMark)
          .map((filteredMark) => ({ ...filteredMark, studentName: getStudentNameById(filteredMark.studentId), subjId: sub.subId, subName: getSubjectNameById(sub.subId) }))
      ));
      setFilteredData(filter)
      console.log(filter);
    } else if (term == 2) {
      const filter = allMarksWithTerm.secondTerm.flatMap((sub) => (
        sub.marks.filter((mark) => mark.mark < filterMark)
          .map((filteredMark) => ({ ...filteredMark, studentName: getStudentNameById(filteredMark.studentId), subjId: sub.subId, subName: getSubjectNameById(sub.subId) }))
      ));
      setFilteredData(filter)
      console.log(filter);
    } else {
      const filter = allMarksWithTerm.thirdTerm.flatMap((sub) => (
        sub.marks.filter((mark) => mark.mark < filterMark)
          .map((filteredMark) => ({ ...filteredMark, studentName: getStudentNameById(filteredMark.studentId), subjId: sub.subId, subName: getSubjectNameById(sub.subId) }))
      ));
      setFilteredData(filter)
      console.log(filter);
    }

    setModal(true)
  }

  const getStudentNameById = (id) => {
    const stu = myClassDetails.allStudents.filter((st) => (
      st._id === id
    ))[0]
    return stu.firstName + ' ' + stu.lastName
  }

  const getSubjectNameById = (id) => {
    const stu = myClassDetails.classModules.filter((st) => (
      st._id === id
    ))[0]
    return stu.subName
  }

  return (
    <div >
      {
        loading && <Loader />
      }
      <Modal
        open={isModal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rounded-xl border'>
          <table>
            <tr>
              <th className='px-4 py-2'>
                Student id
              </th>
              <th className='px-4 py-2'>
                Student Name
              </th>
              <th className='px-4 py-2'>
                Mark
              </th>
              <th className='px-4 py-2'>
                Subject Name
              </th>
            </tr>
            {
              filteredData.map((student) => (
                <tr >
                  <td className='px-4 py-2'>
                    {student.studentId}
                  </td>
                  <td className='px-4 py-2'>
                    {student.studentName}
                  </td>
                  <td className='px-4 py-2'>
                    {student.mark}
                  </td>
                  <td className='px-4 py-2'>
                    {student.subName}
                  </td>
                </tr>
              ))
            }
          </table>
        </Box>
      </Modal>
      <h1 className='mb-5 text-xl font-semibold mt-5'>Welcome to your class</h1>
      <div className='flex items-center justify-between gap-5'>
        <SimpleCard icon={<AccountBalanceIcon />} name={'Your Class'} count={myClassDetails?.myClass?.grade ? (myClassDetails?.myClass?.grade + ' / ' + myClassDetails?.myClass?.subClass) :'You have no class'} />
        <SimpleCard icon={<AccountBalanceIcon />} name={'Current Term'} count={getTerm() + '/3'} />
        {/* <SimpleCard icon={<AccountBalanceIcon />} name={'Your Class'} count={'8A'} />
        <SimpleCard icon={<AccountBalanceIcon />} name={'Your Class'} count={'8A'} /> */}
      </div>
      <br />
      <Button type='button' variant='contained' onClick={() => toPDF()} className='mt-10'>Download PDF</Button>
     {myClassDetails?.myClass?.grade &&
      <div className='w-full bg-white p-3 mt-5' ref={targetRef}>
          <h2>Class Teacher Name : {Cookies.get('firstName')}</h2>
          <h2>Year : {new Date().getFullYear()}</h2>
        {
          firstTermMarksDist.length > 0 && <BarChart
            width={firstTermMarksDist.length * 120}
            height={300}
            series={[
              { data: firstTermMarksDist?.map((st) => (st.totalMarks)), label: 'Student', id: 'uvId' },
            ]}
            xAxis={[{ data: firstTermMarksDist?.map((st) => (getStudentNameById(st.studentId))), scaleType: 'band', label: 'Student Id' }]}
          />
        }
        <div className='flex items-center justify-start gap-5'>
          <h2>Filter Student on marks</h2>
          <Input placeholder='Marks' value={filterMark} onChange={e => setFilterMark(e.target.value)} />
          <Button variant='outlined' onClick={() => handleFilterStudentOnMark(1)}>Filter</Button>
        </div>


        <h2 className='mt-5'>First Term</h2>
        <span> 1st Place : {firstTermMarksDist?.length > 0 && getTheStudentWithMax(firstTermMarksDist)}</span>
        <br />
        <table className='w-full'>
          <thead>
            <tr className=' bg-slate-300'>
              <th className='p-3'>Student ID</th>
              <th className='p-3'>Student Name</th>
              {
                myClassDetails?.classModules?.map((subj) => (
                  <th className='p-3'>{subj.subName}</th>
                ))
              }
              <th className='p-3'>Total</th>
              <th className='p-3'>Average</th>
            </tr>
          </thead>
          <tbody>
            {myClassDetails?.allStudents?.map((student) => (
              <tr key={student._id}>
                <td className='p-3'>{student?._id}</td>
                <td className='p-3'>{student?.firstName + ' ' + student.lastName}</td>
                {myClassDetails.classModules.map((subj, index) => (
                  <td key={index} className='p-3'>
                    {allMarksWithTerm.firstTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark || 'N/A'}
                    -
                    {allMarksWithTerm.firstTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark ? calculateGrade(allMarksWithTerm.firstTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark) : ''}
                  </td>
                ))}
                <td className='p-3 totalOfMarks'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.firstTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0)
                  }
                </td>

                <td className='p-3 average'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.firstTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) ? myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.firstTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) / myClassDetails?.classModules.length : ''
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {
          secondTermMarksDist.length > 0 && <BarChart
            width={secondTermMarksDist.length * 120}
            height={300}
            series={[
              { data: secondTermMarksDist?.map((st) => (st.totalMarks)), label: 'StudentId', id: 'uvId' },
            ]}
            xAxis={[{ data: secondTermMarksDist?.map((st) => (getStudentNameById(st.studentId))), scaleType: 'band', label: 'Student Id' }]}
          />
        }

        <div className='flex items-center justify-start gap-5'>
          <h2>Filter Student on marks</h2>
          <Input placeholder='Marks' value={filterMark} onChange={e => setFilterMark(e.target.value)} />
          <Button variant='outlined' onClick={() => handleFilterStudentOnMark(2)}>Filter</Button>
        </div>

        <h2 className='mt-5'>Second Term</h2>
        <span> 1st Place : {secondTermMarksDist?.length > 0 && getTheStudentWithMax(secondTermMarksDist)}</span>
        <br />
        <table className='w-full'>
          <thead>
            <tr className=' bg-slate-300'>
              <th className='p-3'>Student ID</th>
              <th className='p-3'>Student Name</th>
              {
                myClassDetails?.classModules?.map((subj) => (
                  <th className='p-3'>{subj.subName}</th>
                ))
              }
              <th className='p-3'>Total</th>
              <th className='p-3'>Average</th>
            </tr>
          </thead>
          <tbody>
            {myClassDetails?.allStudents?.map((student) => (
              <tr key={student._id}>
                <td className='p-3'>{student?._id}</td>
                <td className='p-3'>{student?.firstName + ' ' + student.lastName}</td>
                {myClassDetails.classModules.map((subj, index) => (
                  <td key={index} className='p-3'>
                    {allMarksWithTerm.secondTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark || 'N/A'}

                    -
                    {allMarksWithTerm.secondTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark ? calculateGrade(allMarksWithTerm.secondTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark) : ''}
                  </td>
                ))}
                <td className='p-3 totalOfMarks'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.secondTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0)
                  }
                </td>

                <td className='p-3 totalOfMarks'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.secondTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) ? myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.secondTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) / myClassDetails?.classModules.length : ''
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {
          thirdTermMarksDist.length > 0 && <BarChart
            width={thirdTermMarksDist.length * 120}
            height={300}
            series={[
              { data: thirdTermMarksDist?.map((st) => (st.totalMarks)), label: 'StudentId', id: 'uvId' },
            ]}
            xAxis={[{ data: thirdTermMarksDist?.map((st) => (getStudentNameById(st.studentId))), scaleType: 'band', label: 'Student Id' }]}
          />
        }
        <div className='flex items-center justify-start gap-5'>
          <h2>Filter Student on marks</h2>
          <Input placeholder='Marks' value={filterMark} onChange={e => setFilterMark(e.target.value)} />
          <Button variant='outlined' onClick={() => handleFilterStudentOnMark(3)}>Filter</Button>
        </div>

        <h2 className='mt-5'>Third Term</h2>
        <span> 1st Place : {thirdTermMarksDist?.length > 0 && getTheStudentWithMax(thirdTermMarksDist)}</span>
        <br />
        <table className='w-full'>
          <thead>
            <tr className=' bg-slate-300'>
              <th className='p-3'>Student ID</th>
              <th className='p-3'>Student Name</th>
              {
                myClassDetails?.classModules?.map((subj) => (
                  <th className='p-3'>{subj.subName}</th>
                ))
              }
              <th className='p-3'>Total</th>
              <th className='p-3'>Average</th>
            </tr>
          </thead>
          <tbody>
            {myClassDetails?.allStudents?.map((student) => (
              <tr key={student._id}>
                <td className='p-3'>{student?._id}</td>
                <td className='p-3'>{student?.firstName + ' ' + student.lastName}</td>
                {myClassDetails.classModules.map((subj, index) => (
                  <td key={index} className='p-3'>
                    {allMarksWithTerm.thirdTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark || 'N/A'}
                    -

                    {allMarksWithTerm.thirdTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark ? calculateGrade(allMarksWithTerm.thirdTerm.filter((sub) => (
                      sub.subId === subj._id
                    ))[0]?.marks?.filter((mk) => (
                      mk.studentId === student._id
                    ))[0]?.mark) : ''}
                  </td>
                ))}
                <td className='p-3 totalOfMarks'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.thirdTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0)
                  }
                </td>
                <td className='p-3 totalOfMarks'>
                  {
                    myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.thirdTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) ? myClassDetails.classModules.reduce((total, subj) => {
                      const marks = allMarksWithTerm.thirdTerm.filter((sub) => sub.subId === subj._id)[0]?.marks
                        .filter((mk) => mk.studentId === student._id)[0]?.mark || 0;
                      return total + marks;

                    }, 0) / myClassDetails?.classModules.length : ''
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>





      </div>
      }
      <div>
        <h2 className='my-10'>Your Class Modules</h2>
        <div className='flex items-center flex-col justify-center gap-3 bg-amber-100 p-10 rounded-xl'>
          {
            myClassDetails?.classModules?.map((module, index) => (
              <div className='flex items-center justify-between w-full bg-slate-200 hover:bg-slate-300 cursor-pointer p-5 rounded-full' key={index}>
                <div>
                  {module.subName}
                </div>
                <div>
                  {module?.teachBy?.firstName + ' ' + module?.teachBy?.lastName}
                </div>

              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default MyClass
