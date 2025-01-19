from setuptools import setup

setup(
    name='word-detector',
    version='1.0.0',
    description='Word Detector',
    author='Harald Scheidl',
    packages=['word_detector'],
    url="https://github.com/githubharald/WordDetector",
    # install_requires=['numpy', 'sklearn', 'opencv-python'], # The 'sklearn' PyPI package is deprecated, use 'scikit-learn'  rather than 'sklearn' for pip commands.
    install_requires=['numpy', 'scikit-learn', 'opencv-python'],
    python_requires='>=3.7'
)
