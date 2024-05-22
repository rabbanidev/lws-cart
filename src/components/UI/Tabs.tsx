/* eslint-disable no-unused-vars */

type Props = {
  tabs: string[];
  currentTab: string;
  onTab: (tab: string) => void;
};

export default function Tabs({ tabs, currentTab, onTab }: Props) {
  return (
    <ul className="flex flex-wrap">
      {tabs.map((tab) => {
        return (
          <li key={tab} className="ml-3 first:ml-0">
            <button
              type="button"
              className={`inline-block rounded-t-lg border-b-2 pb-3 pt-4 font-roboto font-medium text-gray-800 hover:border-gray-300 ${currentTab === tab ? 'border-gray-300' : 'border-transparent'}`}
              onClick={() => onTab(tab)}
            >
              {tab}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
