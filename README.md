Instancify is an algorithm which provides a better understanding of an image by instantiating it. The algorithm uses instance algorithm segmentation via which we not only have the bounding box of the object as well as pixel-wise masks for each object, enabling us to segment and classify
each object individually.
We Use the MASK-RCNN Model proposed by Matterport Inc. as our backend model and have made a custom Website which allows users to input an image and as a result the instanciated image will be generated.


@misc{matterport_maskrcnn_2017,
  title={Mask R-CNN for object detection and instance segmentation on Keras and TensorFlow},
  author={Waleed Abdulla},
  year={2017},
  publisher={Github},
  journal={GitHub repository},
  howpublished={\url{https://github.com/matterport/Mask_RCNN}},
}
