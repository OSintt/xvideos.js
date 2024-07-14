from setuptools import setup, find_packages

setup(
    name="xvideos-py",          
    version="0.1.0",                 
    description="A powerful scraper for xvideos.com", 
    author="OSintt",              
    author_email="akumagamer123@gmail.com", 
    url="https://github.com/OSintt/xvideos.py", 
    packages=find_packages(where="scraper"), 
    package_dir={"": "scraper"},     
    install_requires=[               
        "beautifulsoup4",
        "requests"
    ],
    tests_require=[                 
        "pytest",
    ],
    entry_points={                   
        'console_scripts': [
            'xvideos=scraper.main:main',  
        ],
    },
    classifiers=[                    
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',         
)
