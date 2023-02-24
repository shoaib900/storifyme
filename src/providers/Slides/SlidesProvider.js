import React, { useState, useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SlidesContext } from './'
import { ModalContext } from '../Modal'
import { NotificationContext } from '../Notification'
import ModalView from '../../components/modal'
import removeSvg from '../../assets/imgs/remove.svg'
import { Resize } from '../../components/Editor'
import { isUrl } from '../../helper/meta'

const SlidesProvider = ({ children }) => {
  const { setModalContent, closeModal } = useContext(ModalContext)
  const { openNotification } = useContext(NotificationContext)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([
    {
      id: uuidv4(),
      backgroundColor: '',
      backgroundUrl: '',
      child: [],
      isActive: true,
    },
    {
      id: uuidv4(),
      backgroundColor: '',
      backgroundUrl: '',
      child: [],
      isActive: false,
    },
    {
      id: uuidv4(),
      backgroundColor: '',
      backgroundUrl: '',
      child: [],
      isActive: false,
    },
  ])

  const changeBackground = useCallback((type) => {
    console.log(type, isUrl(type))
    let tempSlides = [...slides]
    tempSlides[currentSlide].backgroundUrl = ''
    tempSlides[currentSlide].backgroundColor = ''
    isUrl(type)
      ? (tempSlides[currentSlide].backgroundUrl = type)
      : (tempSlides[currentSlide].backgroundColor = type)
    setSlides(tempSlides)
  })

  const changeAlignment = useCallback((alignment) => {
    let tempArr = [...slides]
    console.log('Temp', tempArr)
  })

  const getSlides = useCallback(() => {
    let tempArr = [...slides]
    let curr = tempArr.findIndex((a) => a.id === tempArr[currentSlide].id) + 1
    let startFrom = curr - 2 >= 2 ? curr - 3 : 0
    let endAt =
      slides.length >= 5 && startFrom === 0
        ? curr + 2
        : slides.length < 5
          ? slides.length
          : 5
    // console.log(slides.length, endAt)
    let a = tempArr.splice(startFrom, endAt)
    return a
  })

  const changeSlide = useCallback((index) => {
    // let index = slides.findIndex((a) => a.id === id)
    let tempArr = [...slides]
    tempArr[currentSlide].isActive = false
    tempArr[index].isActive = true
    setSlides(tempArr)
    setCurrentSlide(index)
  })

  const addNewSlide = useCallback(() => {
    const tempArr = [...slides]
    tempArr[currentSlide].isActive = false
    tempArr.splice(currentSlide + 1, 0, {
      id: uuidv4(),
      backgroundColor: '',
      child: [],
      isActive: true,
    })
    // console.log(tempArr)
    setCurrentSlide(currentSlide + 1)
    setSlides(tempArr)
  })

  const updateSlide = useCallback((type, slideNo, val, alt) => {
    console.log(
      'test provider',
      type,
      currentSlide,
      slideNo,
      slides[currentSlide]
    )
    if (type) {
      console.log('Tag Props', val, alt)
      if (alt !== 'background-image') {
        let tempArr = [...slides]
        tempArr[currentSlide].child.push(<Resize tag={type} child={val} />)
        // console.log(currentSlide, slides[currentSlide])
        setSlides(tempArr)
      } else {
        changeBackground(val)
      }
    }
  })

  const setBackgroundImageOfSlide = useCallback((imgUrl) => {
    let tempSlides = [...slides]
    console.log(isUrl(imgUrl))
    tempSlides[currentSlide].backgroundUrl = imgUrl
    setSlides(tempSlides)
  })

  const deleteSlide = useCallback((deleteIdx) => {
    const tempArr = [...slides]
    tempArr.splice(deleteIdx, 1)
    // let activeIndex = deleteIdx === tempArr.length ? deleteIdx - 1 : deleteIdx
    let activeIndex =
      deleteIdx === tempArr.length || deleteIdx > 0 ? deleteIdx - 1 : deleteIdx
    // console.log(deleteIdx, activeIndex)
    tempArr[activeIndex].isActive = true
    setCurrentSlide(activeIndex)
    setSlides(tempArr)
    closeModal()
    openNotification({
      type: 'success',
      desc: `Slide ${deleteIdx + 1} Deleted Successfully!`,
    })
  })

  const deleteSlideChild = useCallback((childIndex, slideId) => {
    let tempSlides = [...slides]
    const selectedIndex = tempSlides.findIndex((slide) => slide.id === slideId)
    tempSlides[selectedIndex].child = tempSlides[selectedIndex].child.filter(
      (obj, i) => i !== childIndex
    )
    setSlides(tempSlides)
  })

  const openDeleteModal = useCallback(() => {
    let slide = slides.findIndex((a) => a.id === slides[currentSlide].id)
    setModalContent(
      <ModalView
        okText='Yes, remove this slide'
        cancelText='No, keep this slide'
        onDlete={() => deleteSlide(slide)}
        onClose={closeModal}
        title={`Are You Sure ?`}
        imageSrc={removeSvg}
        subText={`This action will permanently remove slide ${slide + 1
          } from your story.`}
        okButtonProps={{ danger: true, className: 'btn' }}
        cancelButtonProps={{ className: 'btn' }}
      />
    )
  })

  return (
    <SlidesContext.Provider
      value={{
        currentSlide,
        slides,
        changeBackground,
        getSlides,
        changeSlide,
        addNewSlide,
        updateSlide,
        openDeleteModal,
        changeAlignment,
        deleteSlideChild,
      }}
    >
      {children}
    </SlidesContext.Provider>
  )
}

export default SlidesProvider
