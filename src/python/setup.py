from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="xvideos-py",
    version="0.1.3",
    description="A powerful Python library to scrape xvideos.com",
    author="OSintt",
    author_email="akumagamer123@gmail.com",
    url="https://github.com/OSintt/xvideos.py",
    packages=find_packages(),
    package_data={
        'xvideos': ['videos/base/config/config.json'],
    },
    install_requires=[
        "beautifulsoup4",
        "requests",
    ],
    tests_require=[
        "pytest",
    ],
    entry_points={
        'console_scripts': [
            'xvideos=xvideos.main:main',
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    long_description=long_description,
    long_description_content_type="text/markdown",
)
