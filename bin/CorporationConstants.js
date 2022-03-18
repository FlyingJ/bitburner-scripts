// Corporation Unlock Upgrades
// Upgrades for entire corporation, unlocks features, either you have it or you dont
// The data structure is an array with the following format:
//  [index in Corporation feature upgrades array, price, name, description]
export const UNLOCKS = [
  //Lets you export goods
  {
    'name': 'Export',
    'description': 'Develop infrastructure to export your materials to your other facilities. This allows you to move materials around between different divisions and cities.',
    'price': 20e9,
  },
  //Lets you buy exactly however many required materials you need for production
  {
    'name': 'Smart Supply',
    'description': 'Use advanced AI to anticipate your supply needs. This allows you to purchase exactly however many materials you need for production.',
    'price': 25e9,
  },
  //Displays each material/product's demand
  {
    'name': 'Market Research - Demand',
    'description': 'Mine and analyze market data to determine the demand of all resources. The demand attribute, which affects sales, will be displayed for every material and product.',
    'price': 5e9,
  },
  //Display's each material/product's competition  
  {
    'name': "Market Data - Competition",
    'price': 5e9,
    'description': 'Mine and analyze market data to determine how much competition there is on the market for all resources. The competition attribute, which affects sales, will be displayed for every material and product.',
  },
  {
    'name': "VeChain",
    'price': 10e9,
    'description': "Use AI and blockchain technology to identify where you can improve your supply chain systems. This upgrade will allow you to view a wide array of useful statistics about your Corporation.",
  },
  {
    'name': "Shady Accounting",
    'price': 500e12,
    'description': "Utilize unscrupulous accounting practices and pay off government officials to save money on taxes. This reduces the dividend tax rate by 5%.",
  },
  {
    'name': "Government Partnership",
    'price': 2e15,
    'description': "Help national governments further their agendas in exchange for lowered taxes. This reduces the dividend tax rate by 10%",
  },
  {
    'price': 50e9,
    'name': "Warehouse API",
    'description': "Enables the warehouse API.",
  },
  {
    'price': 50e9,
    'name': "Office API",
    'description': "Enables the office API.",
  },
];

export const UPGRADES = [
`Smart Factories`,
`Wilson Analytics`,
`Neural Accelerators`,
`Project Insight`,
`Smart Storage`,
`Nuoptimal Nootropic Injector Implants`,
`FocusWires`,
`DreamSense`,
`Speech Processor Implants`,
`ABC SalesBots`,
];

export const INDUSTRIES = [
`Agriculture`,
`Chemical`,
`Computer`,
`Energy`,
`Fishing`,
`Food`,
`Healthcare`,
`Mining`,
`Pharmaceutical`,
`RealEstate`,
`Robotics`,
`Software`,
`Tobacco`,
`utilities`,
];

export const 