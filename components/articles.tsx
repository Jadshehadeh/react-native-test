import React, { useState, useEffect,  ReactElement, FC } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { getArticles } from "../api/articles";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setArticles } from "../redux/slices/articlesSlice";

const renderItem = ({ item, index }: any) => {
  return (
    <View className="rounded-xl flex flex-col justify-start items-center bg-gray-200 p-2 m-4">
      <View className="flex flex-row justify-between w-full border-b-2 border-gray-300">
        <Text className=" font-semibold text-xl p-4"># {index}</Text>
        <Text className=" font-semibold text-xl p-4">{item.section_name}</Text>
      </View>
      <View className="flex my-4 mx-1">
        <Text className="">{item.lead_paragraph}</Text>
      </View>
    </View>
  );
};

const EmptyListMessage = () => {
  return (
    <Text className=" text-center font-extrabold p-10">No posts available</Text>
  );
};

const Articles: FC<{}> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const articles = useAppSelector((state) => state.articles.articles);
  const filter = useAppSelector((state) => state.articleFilter.filter);

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  const getData = async () => {
    setIsLoading(true);
    await getArticles(token, 0)
      .then((result) => {
        dispatch(setArticles([...result]));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOnEndReached = async () => {
    setCurrentPage((prev) => prev + 1);
    await getArticles(token, currentPage)
      .then((result) => {
        dispatch(setArticles([...articles, ...result]));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const ListFooterComponent = () => (
    <Text className="text-2xl text-center p-4">
      <View style={styles.loaderStyle}>
        {isLoading && <ActivityIndicator size="large" color="orange" />}
      </View>
    </Text>
  );

  const searchFilteredData = (filter: string) => {
    if (filter) {
      const newData = articles.filter((item: any) => {
        const itemData = item.lead_paragraph
          ? item.lead_paragraph.toUpperCase()
          : "".toUpperCase();
        const textData = filter.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(articles);
    }
  };
  useEffect(() => {
    searchFilteredData(filter);
  }, [filter]);

  const refreshData = () => {
    dispatch(setArticles([]));
    getData();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData && filteredData.length > 0 ? filteredData : articles}
        onRefresh={refreshData}
        refreshing={isLoading}
        renderItem={renderItem}
        keyExtractor={(item: any, index) => index.toString()}
        ListFooterComponent={ListFooterComponent}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={1}
        ListEmptyComponent={EmptyListMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default Articles;
